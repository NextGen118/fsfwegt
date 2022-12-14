import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

// layout HOC
import withLayout from '../components/Layout';
import { allFlattenRoutes as routes } from './index';
import SuccessMsg from "../components/AlertMsg"

const Routes = () => (
    // rendering the router with layout
    <BrowserRouter>
        <Switch>
            {routes.map((route, index) => {
                return (
                    !route.children && (
                        <route.route
                            key={index}
                            path={route.path}
                            roles={route.roles}
                            exact={route.exact}
                            component={withLayout(props => {
                                return(<>
{/* {SuccessMsg("Owner",true,"fail")} */}
                                <route.component {...props} />
                                </> )
                            })}></route.route>
                    )
                );
            })}
        </Switch>
    </BrowserRouter>
);

export default Routes;
