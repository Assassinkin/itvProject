import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps){
    // Call action creator to sign up the user!
    this.props.signupUser(formProps);
  }
  renderAlert(){
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops!!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const {handleSubmit, fields: {email, password, passwordConfirm, gender, age, interest}} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Telephone Number:</label>
          <input className="form-control" {...email}/>
          {email.touched&&email.error&&<div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input className="form-control" type="password" {...password}/>
          {password.touched&&password.error&&<div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm password:</label>
          <input className="form-control" type="password" {...passwordConfirm}/>
          {passwordConfirm.touched&&passwordConfirm.error&&<div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Gender: Please type M for male or F for female</label>
          <input className="form-control" {...gender}/>
          {gender.touched&&gender.error&&<div className="error">{gender.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Age:</label>
          <input className="form-control" type="number" {...age}/>
          {age.touched&&age.error&&<div className="error">{age.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Interest:</label>
          <input className="form-control" {...interest}/>
          {interest.touched&&interest.error&&<div className="error">{interest.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors={};
  if(!formProps.email){
    errors.email='Please enter a valid telephone number';
  }
  if(!formProps.password){
    errors.password='Please enter a password';
  }
  if(!formProps.passwordConfirm){
    errors.passwordConfirm='Please confirm your password';
  }
  if(!formProps.gender){
    errors.gender='Please enter your gender';
  }
  if(!formProps.age){
    errors.age='Please enter your age';
  }
  if(!formProps.interest){
    errors.interest='Please enter an interest';
  }

  if (formProps.password !==formProps.passwordConfirm){
    errors.passwordConfirm = 'Passwords must match';
  }
  if( formProps.age<5 || formProps.age>100 ) {
    errors.age = 'invalid age';
  }
  if(formProps.gender!=='M'&&formProps.gender!=='F'){
    errors.gender = 'Please type your gender correctly';
  }


  return errors;
}
function mapStateToProps(state) {
  return {errorMessage: state.auth.error };
}
export default reduxForm({
  form: 'signup',
  fields: ['email', 'password','passwordConfirm','gender','age','interest'],
  validate
}, mapStateToProps, actions)(Signup);
