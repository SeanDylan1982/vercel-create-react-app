import { Avatar, Fab, InputBase, Paper, Zoom, Typography } from '@mui/material'
import { Camera, Delete, Save, Person as PersonIcon } from '@mui/icons-material'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import React, { useState } from 'react'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useIntl } from 'react-intl'
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import ImgageUploadDialog from 'material-ui-shell/lib/containers/ImageUploadDialog'
// import users from '../../config/users.js'

const MyAccount = () => {
  const intl = useIntl()
  const { openDialog } = useQuestions()

  const { auth, updateAuth, setAuth } = useAuth()
  const {
    photoURL: currentPhotoURL = '',
    displayName: currentDisplayName = '',
    email = '',
  } = auth || {}
  const [displayName, setDisplayName] = useState(currentDisplayName)
  const [photoURL, setPhotoURL] = useState(currentPhotoURL)
  const [isImageDialogOpen, setImageDialogOpen] = useState(false)

  const hasChange =
    displayName !== currentDisplayName || photoURL !== currentPhotoURL

  const handleImageChange = (image) => {
    setPhotoURL(image)
  }

  const handleSave = async () => {
    updateAuth({ ...auth, displayName, photoURL })
  }

  const openDeleteDialog = () => {
    openDialog({
      title: intl.formatMessage({
        id: 'delete_account_dialog_title',
        defaultMessage: 'Delete Account?',
      }),
      message: intl.formatMessage({
        id: 'delete_account_dialog_message',
        defaultMessage:
          'This Account and all related data to it will be deleted permanently. Do you want to proceed with the deletion?',
      }),
      action: intl.formatMessage({
        id: 'delete_account_dialog_action',
        defaultMessage: 'DELETE ACCOUNT',
      }),
      handleAction: handleDelete,
    })
  }

  const handleDelete = async (handleClose) => {
    setAuth({ isAuthenticated: false })
    handleClose()
  }

  // function getUserData() {
  // let userData = localStorage.getItem('auth');
  // console.log(userData);
  // users({ userData })
  // let { usernameSaved, emailSaved, passwordSaved, confirmPasswordSaved } = userData
  // console.log(usernameSaved, emailSaved, passwordSaved, confirmPasswordSaved);
  // const uid = randomNumber()
  // users({ uid })
  // users.uid({ usernameSaved, emailSaved, passwordSaved, confirmPasswordSaved })
// }
// getUserData()

// function randomNumber() {
//   for (let i = 0; i < 4; i++) {
//     let rand = Math.floor(Math.random() * 9 + 1);
//     let num = '' + rand;
//     num+=rand
//     console.log(rand,num);
//   }
// }

  return (
    <Page
      // onload={getUserData()}
      pageTitle={intl.formatMessage({
        id: 'my_account',
        defaultMessage: 'My Account',
      })}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Paper
          elevation={3}
          style={{
            position: 'relative',
            borderRadius: 18,
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Fab
            size="medium"
            style={{ position: 'absolute', bottom: 40, right: -16 }}
            onClick={openDeleteDialog}
            color="secondary"
            aria-label="delete"
          >
            <Delete />
          </Fab>

          <Fab
            onClick={() => setImageDialogOpen(true)}
            style={{
              position: 'absolute',
              zIndex: 99,
              top: 50,
              marginRight: -60,
            }}
            color="primary"
            aria-label="save"
            size="small"
          >
            <Camera />
          </Fab>

          {photoURL && (
            <Avatar
              style={{ width: 150, height: 150, marginTop: -40 }}
              alt="User Picture"
              src={photoURL}
            />
          )}
          {!photoURL && (
            <Avatar
              style={{ width: 150, height: 150, marginTop: -40 }}
              alt="User Picture"
            >
              {displayName ? displayName[0].toUpperCase() : <PersonIcon />}
            </Avatar>
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: 18,
              marginBottom: 18,
            }}
          >
            <InputBase
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              inputProps={{
                'aria-label': 'naked',
                style: {
                  fontSize: 26,
                  fontWeight: 'bold',
                  textAlign: 'center',
                },
              }}
            />
            <Typography variant="h6">{email}</Typography>
          </div>

          <Zoom in={hasChange}>
            <Fab
              onClick={handleSave}
              style={{ marginBottom: -20 }}
              color="primary"
              aria-label="save"
            >
              <Save />
            </Fab>
          </Zoom>
        </Paper>
        {
          <ImgageUploadDialog
            isOpen={isImageDialogOpen}
            handleClose={() => setImageDialogOpen(false)}
            handleCropSubmit={handleImageChange}
          />
        }
      </div>
    </Page>
  )
}

export default MyAccount
