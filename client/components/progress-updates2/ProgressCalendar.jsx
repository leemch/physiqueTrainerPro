import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import BootstrapTheme from '@fullcalendar/bootstrap';
import Spinner from "../common/Spinner.jsx";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProgressUpdates } from "../../actions/progressUpdateActions";


// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/bootstrap/main.css";
import { Calendar } from "@fullcalendar/core";

class ProgressCalendar extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    calendarWeekends: true,
    calendarEvents: [],
    loading: true

  };



  // componentDidMount() {

  //   this.props.getProgressUpdates(this.props.match.params.client_id);

  // }

  // componentDidUpdate(prevProps, prevState, snapshot){

  //   const {progressUpdates} = this.props.progressUpdate

  //   if (this.props.progressUpdate !== prevProps.progressUpdate) {
  //     let newUpdates = [];

  //     if(progressUpdates != null){
  //       progressUpdates.map(update => {

  //         let stringToDate = new Date(update.date);
  //         const dd = String(stringToDate.getDate()).padStart(2, '0');
  //         const mm = String(stringToDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  //         const yyyy = stringToDate.getFullYear();
  //         let progressDate = yyyy + '-' + mm + '-' + dd;
  //         console.log(progressDate);

  //         newUpdates.push({
  //           // creates a new array
  //           title: "Progress update posted",
  //           start: progressDate,
  //           allDay: true,
  //           imageurl:'img/edit.png'
  //         })
  //       });
  //     }

  //     this.setState({
  //       calendarEvents: newUpdates
  //     });
  //   }
  // }



  render() {
    const { loading, progressUpdates } = this.props.progressUpdate;
    let calendarContent;
    if (loading) {
      calendarContent = <Spinner />
    }
    else {
      calendarContent = (<FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: "prev,next today",
          center: "",
          right: "dayGridMonth, dayGridWeek, dayGridDay"
        }}
        plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin]}
        ref={this.calendarComponentRef}
        weekends={this.state.calendarWeekends}
        events={this.state.calendarEvents}
        dateClick={this.handleDateClick}
        eventClick={this.handleEventClick}
      />);
    }


    return (
      <div className="demo-app">
        <div className="demo-app-top">

        </div>
        <div className="demo-app-calendar">
          {calendarContent}
        </div>
      </div>
    );
  }


  handleEventClick = info => {

    // const {progressUpdates} = this.props.progressUpdate
    // let dateClicked = new Date(info.event.start);


    // const updateIndex = progressUpdates.findIndex(update => {
    //     let progressDate = new Date(update.date);
    //     return (dateClicked.getDate() === progressDate.getDate() && dateClicked.getMonth() === progressDate.getMonth() && dateClicked.getFullYear() === progressDate.getFullYear())
    // });

    // if(updateIndex != -1){
    //   console.log(progressUpdates[updateIndex]._id);
    //   this.props.history.push(`/progress_details/${progressUpdates[updateIndex]._id}`);
    // }


  }

  handleDateClick = arg => {

    //this.props.history.push("/progress_details");

  };
}

ProgressCalendar.propTypes = {
  getProgressUpdates: PropTypes.func.isRequired,
  progressUpdate: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  progressUpdate: state.progressUpdate
});

export default connect(mapStateToProps, { getProgressUpdates })(ProgressCalendar);
