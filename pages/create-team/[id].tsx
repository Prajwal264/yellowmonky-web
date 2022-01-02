import React, { useState } from 'react';
import toast from 'react-hot-toast';
import FormInput from '../../components/shared/form-input/form-input.component';
import PrimaryButton from '../../components/shared/primary-button/primary-button.component';
import { replacePlacholdersWithValues } from '../../helpers/manipulation.helper';
import { handleEmailValidation } from '../../helpers/validation.helper';
import styles from '../../styles/pages/create-team.module.scss';
import { ArrayElement } from '../../types/generics.type';
import Avatar from 'react-avatar';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { useEditTeamMutation } from '../../apollo/generated/graphql';
import cookie from 'react-cookies';
interface Props {
  data: {
    teamId: string,
  }
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
  heading: 'Who do you email most about {purpose}?',
  subheading: 'To give YellowMonky a spin, add a few friends you talk with regularly.',
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
const CreateTeamPage: React.FC<Props> = ({ data: { teamId } }) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const router = useRouter();
  const [editTeam] = useEditTeamMutation();
  /**
   *
   *
   */
  const skipToNextStep = () => {
    setCurrentStepIndex((prevStepIndex) => (prevStepIndex + 1))
  }

  const updateMemberEmail = (e: React.ChangeEvent<HTMLInputElement>, memberIndex: number) => {
    const { value } = e.target;
    const alteredMembers = [...formData.members];
    alteredMembers[memberIndex] = value;
    setFormData((prevState) => ({
      ...prevState,
      members: alteredMembers,
    }))
    return;
  }

  /**
   *
   *
   * @param {*} e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  /**
   *
   *
   */
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
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    switch (currentStepIndex) {
      case 0:
        if (!formData.teamName) {
          toast.error('Please enter a team name');
          return;
        }
        skipToNextStep();
        break;
      case 1:
        if (!formData.purpose) {
          toast.error('Please enter a name for your default channel');
          return;
        }
        const nextStepMetadata = STEP_DATA[currentStepIndex + 1];
        const replacementRecord = {
          purpose: formData.purpose,
        }
        nextStepMetadata.heading = replacePlacholdersWithValues(nextStepMetadata.heading, replacementRecord);
        skipToNextStep();
        break;
      case 2:
        const emails = formData.members.filter(member => member);
        if (!emails.length) {
          toast.error('Please add a team mate');
          return;
        }
        const invalidEmailExists = emails.filter(member => member).some((member) => {
          if (!handleEmailValidation(member)) {
            toast.error(`${member} is an invalid email`)
            return true;
          }
          return false;
        });
        if (invalidEmailExists) {
          return;
        };
        if ((new Set(emails)).size !== emails.length) {
          toast.error('Duplicate emails exist')
          return;
        }
        sumbitTeamData();
        break;
      default:
        break;
    }
  }

  const sumbitTeamData = async (ignoreEmails = false) => {
    const payload: any = { ...formData };
    if (ignoreEmails) {
      delete payload.members;
    }
    if (formData.purpose) {
      payload.channels = [formData.purpose]
    }
    console.log('submitable', payload);

    try {
      const editTeamResponse = await editTeam({
        variables: {
          id: teamId,
          ownerId: cookie.load('userId'),
          ...payload,
        }
      })
      const createdChannels = editTeamResponse.data?.editTeam.channels;

      router.push({
        pathname: '/app/client/[teamId]/[channelId]',

        query: {
          teamId,
          channelId: createdChannels![createdChannels?.length! - 1], // TODO: update channelId from api
        }
      });
    } catch (error: any) {
      toast.error(error.message)
      return;
    }
  }

  const renderFormInput = (step: ArrayElement<typeof STEP_DATA>) => {
    if (step.id === Steps.ADD_MEMBERS) {
      return (
        <React.Fragment>
          {formData.members.map((_, index) => {
            return (
              <FormInput
                key={`create-team-form-data-member-${index}`}
                name={step.fieldName}
                type={step.type}
                value={formData.members[index]}
                onChange={(e) => updateMemberEmail(e, index)}
                inputAttributes={{
                  placeholder: step.placeholder,
                }}
              />
            )
          })}
          <button className={styles.addMemberCta} onClick={addMemberField}>Add another</button>
        </React.Fragment>
      )
    }
    return (<FormInput
      name={step.fieldName}
      type={step.type}
      value={formData[step.fieldName as keyof FormData] as string}
      onChange={handleChange}
      inputAttributes={{
        placeholder: step.placeholder,
      }} />)
  }
  return (
    <div className={styles.createTeamPage}>
      <div className={styles.topNav}> </div>
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
          {STEP_DATA[currentStepIndex].id === Steps.ADD_MEMBERS &&
            formData.purpose && <nav className={styles.channelSidebarNav}>
              <div className={styles.sidebarList}>
                <div className={styles.scrollContainer}>
                  <h5 className={styles.heading}>
                    Channels
                  </h5>
                  <p className={styles.listItem}>
                    # {formData.purpose}
                  </p>
                  <br />
                  <h5 className={styles.heading}>
                    Direct messages
                  </h5>
                  {formData.members.filter((member) => (member && handleEmailValidation(member))).map((member, index) => {
                    const name = member.split("@")[0];
                    return (<div className={styles.listItem} key={`form-data-member-${name}-${index}`}>
                      <Avatar name={name} size="20" />{name}
                    </div>)
                  })}
                </div>
              </div>
            </nav>}
        </div>
        <main>
          <div className={styles.viewContents}>
            {STEP_DATA.map((step, index) => {
              if (currentStepIndex !== index) {
                return null;
              }
              return (
                <div className={styles.setupPage} key={step.id}>
                  <div className={styles.setupPageContent}>
                    <div className={styles.teamSetupStepCounter}>
                      Step {index + 1} of {STEP_DATA.length}
                    </div>
                    <div className={styles.inputContent}>
                      <h2>{step.heading}</h2>
                      <p>{step.subheading}</p>
                      {renderFormInput(step)}
                      <div className={styles.ctaSection}>
                        <div className={styles.buttonWrapper}>
                          <PrimaryButton content={step.submitText} onClick={handleSubmit} />
                        </div>
                        {step.id === Steps.ADD_MEMBERS && <button className={styles.skipStepCta} onClick={() => sumbitTeamData(true)}>Skip this step</button>}
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

export const getServerSideProps = (context: GetServerSidePropsContext<NextParsedUrlQuery, PreviewData>) => {
  return {
    props: {
      data: {
        teamId: context.query.id,
      }
    }
  }
}

export default CreateTeamPage
