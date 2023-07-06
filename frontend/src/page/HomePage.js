import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHomePage } from "../slice/newsSlice";

import { getToday } from "../utils";
import { TOPICS } from "../const/const";
import { Button } from "react-bootstrap";

import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import Card from "../component/Card";
import FeedRow from "../component/FeedRow";
import FeedCol from "../component/FeedCol";

export default function HomePage() {
  const dispatch = useDispatch();

  const signInHandler = () => {};

  const newsState = useSelector((state) => state.news);
  const { newsHome, loading, error } = newsState;

  useEffect(() => {
    if (!newsHome) dispatch(getHomePage());
  }, []);

  return loading ? (
    <LoadingBox />
  ) : (
    <div>
      {error && <MessageBox variants="danger">{error}</MessageBox>}

      {newsHome && (
        <Container id="main-container" className="py-5">
          <div className="main-message">
            <h4>Your briefing</h4>
            <span className="text-secondary">{getToday()}</span>
          </div>
          <Row>
            <Col xs={12} lg={8}>
              <div className="crd p-4">
                <div>
                  <Link to="/topics/world" className="topic-navigator">
                    Top stories <i className="fa fa-angle-right "></i>
                  </Link>
                </div>
                <FeedRow data={newsHome.slice(0, 4)}></FeedRow>
                <FeedRow data={newsHome.slice(4, 8)}></FeedRow>
                <FeedRow data={[newsHome[8]]}></FeedRow>
                <FeedRow data={[newsHome[9]]}></FeedRow>
              </div>
            </Col>
            <Col lg={4} className="d-none d-md-block">
              <div className="crd p-4">
                <div className="text-primary">
                  <h5>Picks for you</h5>
                </div>
                <hr></hr>
                <div>
                  <div className="mb-2">
                    <span>
                      Sign in for personalized stories in your briefing & news
                      feed
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    className="home-sign-in w-100"
                    onClick={signInHandler}
                  >
                    Sign in
                  </Button>
                </div>
              </div>
            </Col>
            <Col xs={12}></Col>
          </Row>
          <div className="main-message mt-5 mb-2">
            <h4>More Top Headlines</h4>
            <span className="text-secondary">{getToday()}</span>
          </div>
          <Row>
            <Col xs={12} className="d-flex flex-row justify-content-center">
              <Container>
                <Row>
                  {[...Array(Number(6)).keys()].map((x) => (
                    <Col key={x} xs={12} sm={6} md={4}>
                      <FeedCol
                        data={newsHome.slice(10 + 3 * (x - 1), 10 + 3 * x)}
                      ></FeedCol>
                    </Col>
                  ))}
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
