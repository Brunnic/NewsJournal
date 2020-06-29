import React from "react";
import { connect } from "react-redux";

const Alert = ({ alerts }) => 
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className="alert alert-warning alert-dismissible fade show" role="alert">
      {alert.msg}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  ));

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(Alert);