import React from "react";
import UserActivities from "../../components/Activities/UserActivities";
import DailyFoodIntakesList from "../../components/DailyFoodIntakes/DailyFoodIntakesList";
import DailyStepsList from "../../components/DailySteps/DailyStepsList";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { toYesterday, toTomorrow, setToday } from '../../stores/todaysDate'


const Daily = () => {


  const today = useSelector(state => state.todaysDate.today)

  const dispatch = useDispatch()


  return (
    <div className="container">

      <h1>{new Date(today).toLocaleDateString()}</h1>
      <h1>{new Date(today).toLocaleDateString()}</h1>
      <h1>{new Date(today).toLocaleDateString()}</h1>
      <h1>{new Date(today).toLocaleDateString()}</h1>
      <h1>{today}</h1>
      <h1>{today}</h1>

      <div>
        <button onClick={() => dispatch(toYesterday())}>Arttır (+)</button>
        <button onClick={() => dispatch(toTomorrow())}>Azalt (-)</button>
        <button onClick={() => dispatch(setToday())}>4 Arttır</button>
      </div>





      <div className="mt-3 row">
        <div className="col-md-6">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="card-link">
                Card link
              </a>
              <a href="#" className="card-link">
                Another link
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="card-link">
                Card link
              </a>
              <a href="#" className="card-link">
                Another link
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 row">
        <div className="col-md-6">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="card-link">
                Card link
              </a>
              <a href="#" className="card-link">
                Another link
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="card-link">
                Card link
              </a>
              <a href="#" className="card-link">
                Another link
              </a>
            </div>
          </div>
        </div>
      </div>
      <h1>Günlük</h1>
      <h1>Günlük</h1>
      <h1>Günlük</h1>
      <h1>Günlük</h1>

      <DailyStepsList />
      <DailyFoodIntakesList />
    </div>
  );
};

export default Daily;
