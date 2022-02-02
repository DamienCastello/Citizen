import * as React from 'react';

import Navigation from './src/navigation/Navigation';

// Contexte d’utilisateur authentifié
const UserContext = React.createContext({
  username: '',
  token: '',
  isSignedIn: false
});

function App() {
  return (
    <UserContext.Provider value={{
      username: '',
      token: '',
      isSignedIn: false
    }}>
      <Navigation />
    </UserContext.Provider>
  );
}

export default App;

