import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

import Navbar from './Navbar';
import StocksContainer from '../containers/StocksContainer';
import SliderContainer from '../containers/SliderContainer';
import TradeContainer from '../containers/TradeContainer';
import TransactionsContainer from '../containers/TransactionsContainer';
import PortfolioContainer from '../containers/PortfolioContainer';
import NavigatorSelect from '../components/elements/NavigatorSelect';

import PerfProfiler from './PerfProfiler'

const NavSelect = (props) => (
  <NavigatorSelect className="Dashboard-Select form-control" options={["Transactions", "Trade", "Portfolio"]} {...props} />
)

const NavSelectWithRouter = withRouter(NavSelect);



const App = () => (
  <div className="container-fluid">
    <PerfProfiler />
    <Router>
      <ScrollToTop>
        <Navbar />
        <div className="row">
          <section className="col-sm-4">
            <StocksContainer />
          </section>
          <div className="col-sm-1">
          </div>
          <main className="col-sm-6">
            <SliderContainer />
            <NavSelectWithRouter />
            <Switch>
              <Route exact path="/" component={TransactionsContainer} />
              <Route path="/trade" component={TradeContainer} />
              <Route path="/transactions" component={TransactionsContainer} />    
              <Route path="/portfolio" component={PortfolioContainer} />                
              <Route render={() => <h1 className="Dashboard">Page not found</h1>} />
            </Switch>
          </main>
        </div>
      </ScrollToTop>
    </Router>
  </div>
);

export default App;
