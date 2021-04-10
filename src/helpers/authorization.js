import axios from 'axios';

const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // axios.defaults.headers.common.Authorization = `Bearer BQBfhakjOx9uuIKxoJ0G6SHlna9-gTbDrgNmAOFP_HJAKpG8hK9CbcICq9RySeimt1ZqTkW0jSR2LGkZTCAuKPLMAdTb5561gWbzLEBWc75q4dN0dDcO9cXEPVpJG2nBt0wL2Ge6ufDY0Se7liLDf7LQCKH_MFnChNPYIuZQbQkZ2tcLXyfSjFh2h2OOH1B7jyytXfY7BGpCuiKevO1OU4zuyXXi0dR1e4njO3JKOvun8ohxYA`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthorizationToken;