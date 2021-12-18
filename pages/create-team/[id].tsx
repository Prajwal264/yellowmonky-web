import React, { useState } from 'react';
import FormInput from '../../components/shared/form-input/form-input.component';
import PrimaryButton from '../../components/shared/primary-button/primary-button.component';
import styles from '../../styles/pages/create-team.module.scss';
import { ArrayElement } from '../../types/generics.type';

interface Props {

}

enum Steps {
  TEAM_NAME = 'team_name',
  CREATE_CHANNEL = 'create_channel',
  ADD_MEMBERS = 'add_members',
}

const STEP_DATA = [{
  id: Steps.TEAM_NAME,
  heading: 'What’s the name of your company or team?',
  subheading: 'This will be the name of your YellowMonky workspace — choose something that your team will recognize.',
  placeholder: 'gryffindor',
  fieldName: 'teamName',
  type: 'text',
  submitText: 'Next',
}, {
  id: Steps.CREATE_CHANNEL,
  heading: 'What’s your team working on right now?',
  subheading: 'This could be anything: a project, campaign, event, or the deal you’re trying to close.',
  placeholder: 'Ex: Q4 budget, autumn campaign',
  fieldName: 'purpose',
  type: 'text',
  submitText: 'Next',
}, {
  id: Steps.ADD_MEMBERS,
  heading: 'Who do you email most about communication?',
  subheading: 'To give YellowMonky a spin, add a few coworkers you talk with regularly.',
  placeholder: 'Ex. ellis@gmail.com',
  fieldName: 'member',
  type: 'email',
  submitText: 'Add Teammates',
}];

interface FormData {
  teamName: string;
  purpose: string;
  members: string[];
}

const defaultFormData: FormData = {
  teamName: '',
  purpose: '',
  members: [''],
}

/**
 *
 *
 * @return {*} 
 */
const CreateTeamPage: React.FC<Props> = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  /**
   *
   *
   */
  const skipToNextStep = () => {
    setCurrentStepIndex((prevStepIndex) => (prevStepIndex + 1))
  }

  /**
   *
   *
   * @param {*} e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, memberIndex?: number) => {
    const { name, value } = e.target;
    if (name === 'members' && memberIndex) {
      setFormData((prevState) => ({
        ...prevState,
        name: prevState.members.splice(memberIndex, 0, value),
      }))
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const addMemberField = () => {
    const alteredMembers = [...formData.members];
    alteredMembers.push('');
    setFormData((prevState) => ({
      ...prevState,
      members: alteredMembers
    }))
  }

  /**
   *
   *
   * @param {*} e
   */
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // const { } = e
    // TODO: set validation for each step
  }

  const renderFormInput = (step: ArrayElement<typeof STEP_DATA>) => {
    if (step.id === Steps.ADD_MEMBERS) {
      return (
        <React.Fragment>
          {formData.members.map((_, index) => {
            return (
              <FormInput
                name={step.fieldName}
                type={step.type}
                onChange={(e) => handleChange(e, index)}
                inputAttributes={{
                  placeholder: step.placeholder,
                }}
              />
            )
          })}
        </React.Fragment>
      )
    }
    return (<FormInput
      name={step.fieldName}
      type={step.type}
      onChange={handleChange}
      inputAttributes={{
        placeholder: step.placeholder,
      }} />)
  }
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
                    {!formData.teamName && <div className={styles.loadingSpacer}></div>}
                    <span className={styles.teamNameSpacer}>{formData.teamName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main>
          <div className={styles.viewContents}>
            {STEP_DATA.map((step, index) => {
              if (currentStepIndex !== index) {
                return null;
              }
              return (
                <div className={styles.setupPage}>
                  <div className={styles.setupPageContent}>
                    <div className={styles.teamSetupStepCounter}>
                      Step {index + 1} of {STEP_DATA.length}
                    </div>
                    <div className={styles.inputContent}>
                      <h2>{step.heading}</h2>
                      <p>{step.subheading}</p>
                      {renderFormInput(step)}
                      <div className={styles.buttonWrapper}>
                        <PrimaryButton content="Next" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </div >
  )
}

export default CreateTeamPage
