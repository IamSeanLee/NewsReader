import React, { useEffect, useState } from "react";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubscription,
  subscribeFeed,
  unSubscribeFeed,
} from "../slice/subSlice";

export default function SubscriptionPage() {
  const dispatch = useDispatch();
  const subState = useSelector((state) => state.subscription);
  const { subscription, loading, error, success, subLoading } = subState;
  const [subIdx, setSubIdx] = useState(-1);
  const [subType, setSubType] = useState("unsub");

  const subHandler = (val, id, idx) => {
    if (val === "sub") {
      setSubType("sub");
      setSubIdx(idx);
      dispatch(subscribeFeed(id));
    } else if (val === "unsub") {
      setSubType("unsub");
      setSubIdx(idx);
      dispatch(unSubscribeFeed(id));
    }
  };

  useEffect(() => {
    dispatch(getSubscription());
  }, []);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variants="danger">{error}</MessageBox>
  ) : subscription && subscription.length > 0 ? (
    <Container>
      {success && (
        <MessageBox variants="success">
          {subType === "sub" ? (
            <span> You have successfully subscribed.</span>
          ) : (
            subType === "unsub" && (
              <span> You have successfully unsubscribed.</span>
            )
          )}
        </MessageBox>
      )}
      <Row>
        {subscription.map((s, idx) => (
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={2}
            key={idx}
            className="sub-list-col m-4 d-flex flex-column"
          >
            <div className="sub-avatar img-sm">
              <img
                className="avatar"
                src={s.visualurl ? s.visualurl : "/imgs/no-image.png"}
              ></img>
            </div>
            <div className="flex-fill">
              <span className="sub-title">{s.title}</span>
            </div>
            <div>
              <Button
                type="button"
                value={
                  subscription.find((sc) => sc.id === s.id) ? "unsub" : "sub"
                }
                onClick={(e) => subHandler(e.target.value, s.id, idx)}
              >
                {subLoading && subIdx === idx ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : !subscription.find((sc) => sc.id === s.id) &&
                  subIdx === idx ? (
                  "Subscribe"
                ) : (
                  "Unsubscribe"
                )}
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  ) : (
    <Container>
      <Row>
        <Col>
          <div>
            <img src="/imgs/nothing.png" alt="nothing"></img>
          </div>
          <div className="my-4 text-center">
            <h3 className="text-secondary">
              You do not have any feeds in your subscrition yet.. <br></br>
              Please search a feed and add it to your subscription
            </h3>
          </div>
        </Col>
      </Row>
    </Container>
  );
}