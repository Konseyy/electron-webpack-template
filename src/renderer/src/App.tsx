import React from 'react';

const App = () => {
  return (
    <div>
      <div>React Root Element</div>
      <div>
        Options from preload script:
        <ul>
          {Object.entries(window.electron.versions).map(([pkg, version]) => {
            return (
              <li key={pkg}>
                {pkg}: {version}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
