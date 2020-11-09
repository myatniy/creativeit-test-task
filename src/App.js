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

    const onReset = () => {
        setSearchQuery('');
        props.onSearchQueryChange('');
    };

    const button = searchQuery.length > 0 ? <button onClick={onReset}>Reset</button> : null;

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Type to search"
                value={searchQuery}
                onChange={onSearchQueryChange}
            />
            {button}
        </div>
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
                                ({id, name, created_at, updated_at, html_url}) => {
                                    // created_at
                                    const ca = new Date(Date.parse(created_at));
                                    // updated_at
                                    const ua = new Date(Date.parse(updated_at));
                                    return (
                                        <li key={id}>
                                            <p className="repository"><a href={html_url}>{name}</a></p>
                                            <hr className="under-repository-name" />
                                            <div>
                                                <span>Создан: {`${ca.getHours()}:${ca.getMinutes()}:${ca.getSeconds()} ${ca.getDay() + 1}.${ca.getMonth() + 1}.${ca.getFullYear()}`}</span>
                                                <span>Обновлен: {`${ua.getHours()}:${ua.getMinutes()}:${ua.getSeconds()} ${ua.getDay()}.${ua.getMonth()}.${ua.getFullYear()}`}</span>
                                            </div>
                                        </li>
                                    );
                                }
                            )
                        }
                    </ul>
                </div>
            );
        }
    }
}
