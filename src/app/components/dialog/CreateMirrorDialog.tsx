import { Box, FormControl, Label, Link, Text, TextInput } from '@primer/react'
import { Stack } from '@primer/react/lib-esm/Stack'
import { Dialog } from '@primer/react/lib-esm/drafts'

import { useState } from 'react'
import { ForkData } from 'utils/fork'
import { OrgData } from 'utils/organization'

interface CreateMirrorDialogProps {
  orgData: OrgData
  forkData: ForkData
  isOpen: boolean
  closeDialog: () => void
  createMirror: (data: { repoName: string; branchName: string }) => void
}

export const CreateMirrorDialog = ({
  orgData,
  forkData,
  isOpen,
  closeDialog,
  createMirror,
}: CreateMirrorDialogProps) => {
  // set to default value of 'repository-name' for display purposes
  const [repoName, setRepoName] = useState('repository-name')

  if (!isOpen) {
    return null
  }

  return (
    <Dialog
      title="Create a new mirror"
      subtitle="Mirroring a repository provides a place to iterate on changes privately, before any commits are publicly visible."
      footerButtons={[
        {
          content: 'Cancel',
          onClick: () => {
            closeDialog()
            setRepoName('repository-name')
          },
        },
        {
          content: 'Confirm',
          variant: 'primary',
          onClick: () => {
            createMirror({ repoName, branchName: repoName })
            setRepoName('repository-name')
          },
          disabled: repoName === 'repository-name' || repoName === '',
        },
      ]}
      onClose={() => {
        closeDialog()
        setRepoName('repository-name')
      }}
      width="large"
    >
      <Box>
        <FormControl sx={{ marginBottom: '10px' }}>
          <FormControl.Label>Mirror name</FormControl.Label>
          <TextInput
            onChange={(e) => setRepoName(e.target.value)}
            block
            placeholder="e.g. repository-name"
          />
          <FormControl.Caption>
            This is a private mirror of{' '}
            <Link
              href={`https://github.com/${forkData?.parent?.owner.login}/${forkData?.parent?.name}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {forkData?.parent?.owner.login}/{forkData?.parent?.name}
            </Link>
          </FormControl.Caption>
        </FormControl>
        <FormControl>
          <FormControl.Label>Mirror location</FormControl.Label>
          <Box
            sx={{
              padding: '15px',
              border: '1px solid',
              borderColor: 'border.default',
              borderRadius: '6px',
              width: '100%',
            }}
          >
            <Stack direction="vertical" justify="start" gap="none">
              <Stack.Item grow={false}>
                <Stack.Item>
                  <Text
                    sx={{
                      fontSize: '2',
                      fontWeight: 'bold',
                      paddingRight: '10px',
                    }}
                  >
                    {orgData?.login}/{repoName}
                  </Text>
                  <Label variant="secondary">{'Private'}</Label>
                </Stack.Item>
                <Stack.Item grow={false}>
                  <Text
                    sx={{
                      color: 'fg.muted',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                    }}
                  >
                    Forked from{' '}
                    <Link
                      href={`https://github.com/${forkData?.parent?.owner.login}/${forkData?.parent?.name}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      sx={{ color: 'fg.muted' }}
                    >
                      {forkData?.parent?.owner.login}/{forkData?.parent?.name}
                    </Link>
                  </Text>
                </Stack.Item>
              </Stack.Item>
            </Stack>
          </Box>
        </FormControl>
      </Box>
    </Dialog>
  )
}
