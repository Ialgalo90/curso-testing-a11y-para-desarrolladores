import React from 'react';
import { describe, expect, it } from "vitest";
import { TestTabList } from '../utils/TestTabList';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { TabList } from '../../src/components/tablist';

describe('TabList', () => {
    describe('WAI-ARIA Roles, States, and Properties', () => {
        it('The element that serves as the container for the set of tabs has role tablist.', () => {
            render(
                <TestTabList
                    tabs={[
                        { name: 'Primera tab', content: 'Contenido de l primera tab' },
                    ]}
                />,
            );

            expect(screen.getByRole('tablist'));
        });

        it('Each element that serves as a tab has role tab and is contained within the element with role tablist.', () => {
            const tabs = [
                { name: 'Primera tab', content: 'Contenido de la primera tab' },
                { name: 'Segunda tab', content: 'Contenido de la segunda tab' },
            ];
            const { container } = render(<TestTabList tabs={tabs} />);

            const tabElements = container.querySelectorAll(
                '[role="tablist"] > [role="tab"]'
            );

            expect(tabElements.length).toEqual(tabs.length);

            const tabNames = tabs.map((tab) => tab.name);
            const tabElementsName = Array.from(tabElements).map(
                (tab) => tab.textContent,
            );
            expect(tabElementsName).toEqual(tabNames);
        });

        it.todo('If the tab list has a visible label, the element with role tablist has aria-labelledby set to a value that refers to the labelling element.  Otherwise, the tablist element has a label provided by aria-label',
            () => {
                const tabListLabel = 'Activities';

                renderTabList({
                    tabs,
                    label: tabListLabel,
                });

                const tabList = screen.getByRole('tablist');
                expect(tabList.getAttribute('aria-label')).toEqual(tabListLabel);
                // expect(tabList.getAttribute('aria-labelledby')).toEqual(labelElement.id);
            });

        it.todo('Each element with role tab has the property aria-controls referring to its associated tabpanel element.',
            () => {
                const tabs = [
                    { name: 'Primera tab', content: 'Contenido de la primera tab' },
                    { name: 'Segunda tab', content: 'Contenido de la segunda tab' },
                ];
                render(<TabList tabs={tabs} />);

                const tabElements = screen.getAllByRole("tab");
                const tabPanelElements = screen.getAllByRole("tabpanel", {
                    hidden: true,
                });

                const ariaControl = Array.from(tabElements).map((tab) =>
                    tab.getAttribute('aria-controls'),
                );
                const panelId = Array.from(tabPanelElements).map((tabpanel) =>
                    tabpanel.getAttribute('id'),
                );

                expect(ariaControl).toEqual(panelId);
            });

        it.todo('The active tab element has the state aria-selected set to true and all other tab elements have it set to false.',
            () => {
                const activeIndex = 0;
                renderTabList({ tabs });

                const tabElements = screen
                    .getByRole('tablist')
                    .querySelectorAll('[role="tab"]');
                tabElements.forEach((tab, index) => {
                    expect(tab.getAttribute('aria-selected')).toBe(
                        index === activeIndex ? 'true' : 'false',
                    );
                });
            });

        it.todo('Each element with role tabpanel has the property aria-labelledby referring to its associated tab element.',
            () => {
                renderTabList({ tabs });

                const tabElements = screen
                    .getByRole('tablist')
                    .querySelectorAll('[role="tab"]');
                const tabPanelElements = screen.queryAllByRole('tabpanel', {
                    hidden: true,
                });
                tabPanelElements.forEach((tabPanel, index) => {
                    expect(tabPanel.getAttribute('aria-labelledby')).toEqual(
                        Array.from(tabElements).at(index).id,
                    );
                });
            });

        // It does not apply
        it.skip('If a tab element has a popup menu, it has the property aria-haspopup set to either menu or true.', () => { });

        // It does not apply
        it.skip('If the tablist element is vertically oriented, it has the property aria-orientation set to vertical. The default value of aria-orientation for a tablist element is horizontal.', () => { });
    });
});