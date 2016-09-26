import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { Scenario } from '../../models/scenario';
import { Project } from '../../models/project';
import { ScenarioService } from '../../services/scenario.service';
import { ProjectService } from '../../services/project.service';

/*  Scenario Dropdown Component

    -- Requires project input
    -- Emits selected scenario
    Expected use:
        <scenario-dropdown
            [project]="your_project"
            (scenarioClicked)="your_handler_event">
*/

@Component({
  selector: 'scenario-dropdown',
  template: `<div dropdown class="dropdown dropdown-scenario">
              <button dropdownToggle class="button dropdown-toggle" type="button"
                id="scenarioDropdown" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="true">
                <i class="icon-flash"></i>
                {{ project.scenario.name }}
                <i class="icon-angle-down caret"></i>
              </button>
              <ul dropdownMenu class="dropdown-menu" aria-labelledby="scenarioDropdown">
                <li *ngFor="let scenario of scenarios">
                  <a (click)="onScenarioClicked(scenario)"
                    tooltip="{{ scenario.description }}"
                    tooltipPlacement="bottom"
                    tooltipTrigger="mouseenter"
                    tooltipPopupDelay="300">{{ scenario.name }}</a>
                </li>
              </ul>
            </div>`
})
export class ScenarioDropdownComponent implements OnInit {

    @Input() project: Project;
    @Output() scenarioClicked = new EventEmitter<Scenario>();
    public scenarios: Scenario[] = [];

    constructor(private scenarioService: ScenarioService,
                private projectService: ProjectService) {}

    ngOnInit() {
        this.getScenarios();
    }

    public onScenarioClicked(scenario: Scenario) {
        this.scenarioClicked.emit(scenario);
    }

    private getScenarios() {
        this.scenarioService.list().subscribe(data => this.scenarios = data);
    }
}
