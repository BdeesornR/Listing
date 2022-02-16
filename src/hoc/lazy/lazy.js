import React, { Component } from "react";

const lazy = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
    };

    componentDidMount() {
      importComponent().then((cmp) =>
        this.setState({ component: cmp.default })
      );
    }

    render() {
      const Comp = this.state.component;

      return this.state.component ? <Comp {...this.props} /> : null;
    }
  };
};

export default lazy;
