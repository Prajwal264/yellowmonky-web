import React from 'react';
import FormInput from '../../components/shared/form-input/form-input.component';
import PrimaryButton from '../../components/shared/primary-button/primary-button.component';
import styles from '../../styles/pages/create-team.module.scss';

interface Props {

}

/**
 *
 *
 * @return {*} 
 */
const CreateTeamPage: React.FC<Props> = () => {
  return (
    <div className={styles.createTeamPage}>
      <div className={styles.topNav}></div>
      <div className={styles.workspace}>
        <div className={styles.sidebar}>
          <div className={styles.channelSidebar}>
            <div className={styles.sidebarHeader}>
              <div className={styles.sidebarHeaderButton}>
                <div className={styles.sidebarHeaderInfo}>
                  <div className={styles.sidebarHeaderTeamname}>
                    <div className={styles.loadingSpacer}></div>
                    <span className={styles.teamNameSpacer}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main>
          <div className={styles.viewContents}>
            <div className={styles.setupPage}>
              <div className={styles.setupPageContent}>
                <div className={styles.teamSetupStepCounter}>
                  Step 1 of 3
                </div>
                <div className={styles.inputContent}>
                  <h2>What’s the name of your company or team?</h2>
                  <p>This will be the name of your Slack workspace — choose something that your team will recognize.</p>
                  <FormInput name="teamName" onChange={() => { }} />
                  <div className={styles.buttonWrapper}>
                    <PrimaryButton content="Next" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default CreateTeamPage
