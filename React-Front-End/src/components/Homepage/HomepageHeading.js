import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import { SearchBar } from "../SearchBar";

import HomepageBody from "./HomepageBody";
import HomepageBody2 from "./HomepageBody2";
import HomepageFooter from "./HomepageFooter";

import RecipeList from "../Results/RecipeList";

class HomepageHeading extends Component {
  render() {
    return (
      <Container text>
        <Header
          as="h1"
          content="Resetta"
          inverted
          style={{
            fontSize: this.props.mobile ? "2em" : "4em",
            fontWeight: "normal",
            marginBottom: 0,
            marginTop: this.props.mobile ? "1.5em" : "3em"
          }}
        />
        <SearchBar updateResults={this.props.updateResults} />
      </Container>
    );
  }
}

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
};

/* 
 * Custom Responsive containers
 */
export class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive {...Responsive.onlyComputer}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            className="banner"
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item active>
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item >
                  <Link to="/Favorites">Favorites</Link>
                </Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted={!fixed}>
                    Log in
                  </Button>
                  <Button
                    as="a"
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: "0.5em" }}
                  >
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading updateResults={this.props.updateResults} />
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

export class MobileContainer extends Component {
  state = {};

  handlePusherClick = () => {
    const { sidebarOpened } = this.state;

    if (sidebarOpened) this.setState({ sidebarOpened: false });
  };

  handleToggle = () =>
    this.setState({ sidebarOpened: !this.state.sidebarOpened });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive {...Responsive.onlyMobile}>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="uncover"
            inverted
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item active>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item >
              <Link to="/Favorites">Favorites</Link>
            </Menu.Item>
            <Menu.Item as="a">Log in</Menu.Item>
            <Menu.Item as="a">Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: "100vh" }}
          >
            <Segment
              className="banner"
              inverted
              textAlign="center"
              style={{ minHeight: 350, padding: "1em 0em" }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Button as="a" inverted>
                      Log in
                    </Button>
                    <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading
                mobile
                updateResults={this.props.updateResults}
              />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

export class ResponsiveContainer extends Component {
  render() {
    return (
      <div>
        <DesktopContainer updateResults={this.props.updateResults}>
          {this.props.results[0] ? (
            <RecipeList results={this.props.results} />
          ) : (
            <HomepageBody />
          )}
          {this.props.results[0] ? "" : <HomepageBody2 />}
          <HomepageFooter />
        </DesktopContainer>
        <MobileContainer updateResults={this.props.updateResults}>
          {this.props.results[0] ? (
            <RecipeList results={this.props.results} />
          ) : (
            <HomepageBody />
          )}
          {this.props.results[0] ? "" : <HomepageBody2 />}
          <HomepageFooter />
        </MobileContainer>
      </div>
    );
  }
}

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};