import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import TaskInfoPanelCustomComponent from './TaskInfoPanelCustomComponent.js';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'LifelinePlugin';

export default class LifelinePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);

    flex.TaskInfoPanel.Content.add(
      <TaskInfoPanelCustomComponent key="taskAttributes"/>,
      {
        sortOrder: -1,
      });
  
      flex.CRMContainer.defaultProps.uriCallback = (task) => {
        return task ? "https://copper-narwhal-5955.twil.io/assets/MiniDashv3.html" : "https://copper-narwhal-5955.twil.io/assets/MiniDashv3.html";
      }
      
      const urgentChat = flex.DefaultTaskChannels.createChatTaskChannel("Urgent_Webchat", 
      (task) => task.attributes.skillsNeeded === "urgent", 
      React.ReactNode = "Message", React.ReactNode = "MessageBold")
  
      flex.TaskChannels.register(urgentChat)
    }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
