/// <reference types="cypress" />
import * as commonCommands from './commands/common';
import * as constructorCommands from './commands/constructor';

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(constructorCommands);
