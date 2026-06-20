import { useState } from "react";
import { Descope, useSession } from '@descope/react-sdk';

const PROJECT_ID = "P3FNa8U3DItx9ctPypnKvKFweBcf";

function App() {
  const { isAuthenticated, sessionToken } = useSession();
  const [data, setData] = useState({});
  const [steppedUp, setSteppedUp] = useState(false);

  const fetchData = (token) => {
    const t = token || sessionToken;
    fetch("https://descope-escape-room.com/api/data", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-project-id": PROJECT_ID,
        "Authorization": `Bearer ${t}`,
      },
    })
      .then((response) => response.json())
      .then((resJson) => {
        setData(resJson);
        console.log(resJson);
      });
  };

  if (!isAuthenticated) {
    return (
      <div>
        <Descope
          flowId="sign-up-or-in"
          onSuccess={() => {}}
          onError={(e) => console.log("Descope flow error", e)}
        />
      </div>
    );
  }

  if (!steppedUp) {
    return (
      <div>
        <h3>Step-up authentication required</h3>
        <Descope
          flowId="step-up"
          onSuccess={(e) => {
            setSteppedUp(true);
            fetchData(e.detail.sessionJwt);
          }}
          onError={(e) => console.log("Step-up error", e)}
        />
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => fetchData()}>Fetch</button>
      <code>{data.body}</code>
    </div>
  );
}

export default App;