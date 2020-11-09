import axios from 'axios';

const _apiGithub = 'https://api.github.com';

export const listOfMyRepositories = async () => {
    try {
        return await axios.get(`${_apiGithub}/users/myatniy/repos`);
    } catch (err) {
        console.error(err);
    }
};
