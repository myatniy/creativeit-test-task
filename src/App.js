import React from 'react';

const _apiGithub = 'https://api.github.com';

export default class App extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    repositories: []
  }

  componentDidMount() {
    fetch(`${_apiGithub}/users/myatniy/repos`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            repositories: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const transformedData = 
      this.state.repositories.map(
        ({id, name, created_at, updated_at}) => <li key={id}>
          {name}<br />
          {created_at}<br />
          {updated_at}<br />
        </li>
      );
    
      return (
    <ul>
      {transformedData}
    </ul>
  );
  }
}
