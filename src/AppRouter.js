import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppProfile } from './AppProfile';
import { AppConfig } from './AppConfig';

import { Dashboard } from './components/Dashboard';
//modified
import {AddFArmer} from './myPages/Farmers/AddFarmer';
import {AllFarmers} from './myPages/Farmers/AllFarmers';
import {AddAnimal} from './myPages/Animals/AddAnimal';
import {AllAnimals} from './myPages/Animals/AllAnimals';
import{AllOperations} from "./myPages/operations/AllOperations"

// end of modified
// authentication
import Register from './myPages/Authentication/Register';
import {Login} from './myPages/Authentication/Login';
import{Forgot} from './myPages/Authentication/Forgot_password';
import {Reset} from './myPages/Authentication/Reset_password'

//end authontication

import { ButtonDemo } from './components/ButtonDemo';
import { ChartDemo } from './components/ChartDemo';
import { Documentation } from './components/Documentation';
import { FileDemo } from './components/FileDemo';
import { FloatLabelDemo } from './components/FloatLabelDemo';
import { FormLayoutDemo } from './components/FormLayoutDemo';


import { InputDemo } from './components/InputDemo';
import { ListDemo } from './components/ListDemo';
import { MenuDemo } from './components/MenuDemo';
import { MessagesDemo } from './components/MessagesDemo';
import { MiscDemo } from './components/MiscDemo';
import { OverlayDemo } from './components/OverlayDemo';
import { PanelDemo } from './components/PanelDemo';
import { TableDemo } from './components/TableDemo';
import { TreeDemo } from './components/TreeDemo';
import { InvalidStateDemo } from './components/InvalidStateDemo';

import { Calendar } from './pages/Calendar';
import { Crud } from './pages/Crud';
import { EmptyPage } from './pages/EmptyPage';

import { DisplayDemo } from './utilities/DisplayDemo';
import { ElevationDemo } from './utilities/ElevationDemo';
import { FlexBoxDemo } from './utilities/FlexBoxDemo';
import { GridDemo } from './utilities/GridDemo';
import { IconsDemo } from './utilities/IconsDemo';
import { SpacingDemo } from './utilities/SpacingDemo';
import { TextDemo } from './utilities/TextDemo';
import { TypographyDemo } from './utilities/TypographyDemo';
import { TimelineDemo } from './utilities/TimelineDemo';

import PrimeReact from 'primereact/api';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './layout/flags/flags.css';
import './layout/layout.scss';
import './App.scss';

export const AppRouter=()=>{
return(
    <div className="layout-main">
    <Route path="/" exact component={Dashboard} />
    <Route path="/formlayout" component={FormLayoutDemo} />
    <Route path="/input" component={InputDemo} />
    <Route path="/floatlabel" component={FloatLabelDemo} />
    <Route path="/invalidstate" component={InvalidStateDemo} />
    <Route path="/button" component={ButtonDemo} />
    <Route path="/table" component={TableDemo} />
    <Route path="/list" component={ListDemo} />
    <Route path="/tree" component={TreeDemo} />
    <Route path="/panel" component={PanelDemo} />
    <Route path="/overlay" component={OverlayDemo} />
    <Route path="/menu" component={MenuDemo} />
    <Route path="/messages" component={MessagesDemo} />
    <Route path="/file" component={FileDemo} />
    <Route path="/chart" component={ChartDemo} />
    <Route path="/misc" component={MiscDemo} />
    <Route path="/display" component={DisplayDemo} />
    <Route path="/elevation" component={ElevationDemo} />
    <Route path="/flexbox" component={FlexBoxDemo} />
    <Route path="/icons" component={IconsDemo} />
    <Route path="/grid" component={GridDemo} />
    <Route path="/spacing" component={SpacingDemo} />
    <Route path="/typography" component={TypographyDemo} />
    <Route path="/text" component={TextDemo} />
    <Route path="/calendar" component={Calendar} />
    <Route path="/timeline" component={TimelineDemo} />
    <Route path="/crud" component={Crud} />
    <Route path="/empty" component={EmptyPage} />
    <Route path="/documentation" component={Documentation} />
    {/* my own paths */}
    <Route  path="/addFarmer" component={AddFArmer} />
    <Route  path="/allFarmers" component={AllFarmers} />
    <Route  path="/addAnimal" component={AddAnimal} />
    <Route  path="/allAnimals" component={AllAnimals} />
    <Route  path="/allOperations" component={AllOperations} />
</div>
)


}

