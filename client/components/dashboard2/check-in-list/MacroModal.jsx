import React from 'react';
import TextFieldGroup from "../../common/TextFieldGroup";




class MacroModal extends React.Component {

    constructor() {
		super();
		this.state = {
			fat: "0",
			protein: "0",
			carbs: "0"
		}

	}

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    
    setCurrentMacros = (client) => {
    
        const newMacros = {
            fat: this.state.fat.toString(),
            protein: this.state.protein.toString(),
            carbs: this.state.carbs.toString()
        }
        console.log(client.client._id);
        this.props.setClientMacros(client.client._id, newMacros);
    
    }

    
    render(){

    const {show} = this.props;
    const {clientId} = this.props;

	return(
        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" show={show}>
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">Set Client Macros</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                Fat: <TextFieldGroup onChange={this.onChange} value={this.state.fat} placeholder="Fat macro" info="grams" name="fat" type="number" />
                Protein: <TextFieldGroup onChange={this.onChange} value={this.state.protein} placeholder="Protein macro" info="grams" name="protein" type="number" />
                Carbohydrates: <TextFieldGroup onChange={this.onChange} value={this.state.carbs} placeholder="Carbohydrate macro" info="grams" name="carbs" type="number" />
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                {/* <button type="button" onClick={() => this.setCurrentMacros(this.props.client)} className="btn btn-primary">Save changes</button> */}
            </div>
            </div>
        </div>
        </div>


        );
    }
}

export default MacroModal;