import InboxScreen from "./InboxScreen";
import {Provider} from "react-redux";
import store from "../../lib/store";
import {MockedState} from "../TaskList/TaskList.stories";
import {rest} from "msw";
import {fireEvent, waitFor, waitForElementToBeRemoved, within} from "@storybook/testing-library";

export default {
    component: InboxScreen,
    title: "InboxScreen",
    decorators: [(story) => <Provider store={store}>{story()}</Provider>]
}

const Template = () => <InboxScreen/>;

export const Default = Template.bind({});
Default.parameters = {
    msw: {
        handlers: [
            rest.get(
                "https://jsonplaceholder.typicode.com/todos?userId=1",
                (req, res, context) => {
                    return res(context.json(MockedState.tasks));
                }
            )
        ]
    }
}

Default.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);
    // Waits for the Component to transition from the Loading State
    await waitForElementToBeRemoved(await canvas.findByTestId("loading"));

    // Waits for the Component to be updated based on the Store
    await waitFor(async () => {
        // Simulates pinning the first Task
        fireEvent.click(canvas.getByLabelText("pinTask-1"));

        fireEvent.click(canvas.getByLabelText("pinTask-3"));
    })
}

export const Error = Template.bind({});
Error.parameters = {
    msw: {
        handlers: [
            rest.get(
                "https://jsonplaceholder.typicode.com/todos?userId=1",
                (req, res, context) => {
                    return res(context.status(403));
                }
            )
        ]
    }
}