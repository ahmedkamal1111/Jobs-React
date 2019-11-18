import React, { Component } from 'react';

class Skills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'',
            skillsArr: [],
        }
  
        this.handleChange = this.handleChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
    } 
   
    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    keyPress(e){
        if(e.keyCode === 13){
            this.setState(state => {
                const skillsArr = state.skillsArr.concat(state.value);
                return {
                  skillsArr,
                  value: '',
                };
              });
            
        }
    }
     render(){
        return(
            <div>
                <input 
                    type="text"
                    placeholder="Skills"
                    className="form-control mt-3"
                    value={this.state.value}
                    onKeyDown={this.keyPress}
                    onChange={this.handleChange} 
                    
                />
                <ul>{this.state.skillsArr.map(skill => {
                return <li>{skill}</li>
                })}</ul>
            </div>
        )
      }
}
 
export default Skills;