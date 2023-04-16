import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [repoData, setRepoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://api.github.com/repos/kazi331/kazi331',
        // {
        //   headers: {
        //     Authorization: `token ${import.meta.VITE_GITHUB_API}`,
        //   },
        // }
      );
      setRepoData(response?.data);
    };
try {
  fetchData();
} catch (err) {
  console.log(err)
}
  }, []);

  return
  return (
    <div>
      {repoData ? (
        <div>
          <h1>{repoData?.name}</h1>
          <p>{repoData?.description}</p>
          <p>Language: {repoData?.language}</p>
          <p>Stars: {repoData?.stargazers_count}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
