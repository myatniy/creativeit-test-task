import React, {useState} from 'react';

const _apiGithub = 'https://api.github.com';

const Search = (props) => {
    const [searchQuery, setSearchQuery] = useState('');

    const onSearchQueryChange = (e) => {
        e.preventDefault();
        const newSearchQuery = e.target.value;
        setSearchQuery(newSearchQuery);
        props.onSearchQueryChange(newSearchQuery);
    }

    return (
        <input
            type="text"
            placeholder="Type to search"
            className="search"
            value={searchQuery}
            onChange={onSearchQueryChange}
        />
    )
};

export default class App extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        repositories: [],
        searchQuery: ''
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

    onSearchQueryChange = (newSearchQuery) => {
        this.setState({searchQuery: newSearchQuery});
    }

    search = (items, query) => {
        return (query.length === 0)
            ?
            items
            :
            items.filter(
                item => item
                    .name
                    .toLowerCase()
                    .indexOf(query.toLowerCase()) > -1
            );
    };

    render() {
        const {error, isLoaded, repositories, searchQuery} = this.state;
        const visibleData = this.search(repositories, searchQuery);

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div className="app-container">
                    <Search onSearchQueryChange={this.onSearchQueryChange}/>
                    <ul>
                        {
                            visibleData.map(
                                ({id, name, created_at, updated_at}) => <li key={id}>
                                    {name}<br/>
                                    {created_at}<br/>
                                    {updated_at}<br/>
                                    <hr/>
                                </li>
                            )
                        }
                    </ul>
                </div>
            );
        }
    }
}
