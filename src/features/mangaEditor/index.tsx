import { ChangeEvent, forwardRef, memo, useImperativeHandle, useState } from "react"
import { SwipeableDrawer } from "@mui/material"
import {TextField, Button} from "@mui/material"


import { ThemeProvider } from '@mui/material/styles'

import { darkTheme } from '../../util/mui'
import * as api from "../../services"
import scss from './index.module.scss'
import { IManga } from "../../services/model"

type EditorProps = {
  onClose?: () => void,
  onOpen?: () => void,
  onSaved?: () => void
}

type Error = {
  [key in keyof IManga]: {
    error: boolean,
    helperText: string
  }
}

export interface EditorRef {
  open(): void
}


const Index = forwardRef((props: EditorProps, ref) => {

  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileSrc, setFileSrc] = useState<string>('');

  const [formData, setFormData] = useState<IManga>({} as IManga)

  const [errors, setErrors] = useState<Error>({
    name: {
      error: false,
      helperText: ''
    },
    enname: {
      error: false,
      helperText: ''
    },
    author: {
      error: false,
      helperText: ''
    },
    describe: {
      error: false,
      helperText: ''
    },
    cover: {
      error: false,
      helperText: ''
    }
  })

  const { onClose, onOpen} = props

  const [open, setOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true)
    }
  }))

  const handleDrawerClose = () => {
    setOpen(false)
    onClose && onClose()
  }

  const handleDrawerOpen = () => {
    setOpen(true)
    onOpen && onOpen()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setFileSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
      setFormData({
        ...formData,
        cover: file.name
      })
    } 
  }

  const validateForm = () => {
    let res = true
    const result: Error = {...errors}
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof IManga]) {
        res = false
        result[key as keyof IManga] = {
          error: true,
          helperText: '不能为空'
        }
      } else {
        result[key as keyof IManga] = {
          error: false,
          helperText: ''
        }
      }
    })

    setErrors(result)
    return res
  }

  const create = async() => {
    if (!selectedFile) {
      return
    }

    if (!validateForm()) return

    const fileData = new FormData()
    fileData.append('file', selectedFile)

    try {
      const url = await api.uploadCover(fileData)
      // console.log(url)
      formData.cover = url
      await api.createManga(formData)

      setOpen(false)
      props.onSaved && props.onSaved()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <SwipeableDrawer
        anchor={'right'}
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      >
        <div className={scss.main}>
          <TextField
            className={scss['text-field']}
            id="outlined-controlled"
            label="名称"
            value={formData.name}
            InputProps={{
              inputProps: {
                maxLength: 20,
              },
            }}
            error={errors.name.error}
            helperText={errors.name.helperText}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value
              })
            }}
          />
          <TextField
            className={scss['text-field']}
            id="outlined-controlled"
            label="enname"
            value={formData.enname}
            InputProps={{
              inputProps: {
                maxLength: 20,
              },
            }}
            error={errors.enname.error}
            helperText={errors.enname.helperText}
            onChange={(e) => {
              setFormData({
                ...formData,
                enname: e.target.value
              })
            }}
          />

          <TextField
            className={scss['text-field']}
            id="outlined-controlled"
            label="作者"
            value={formData.author}
            InputProps={{
              inputProps: {
                maxLength: 20,
              },
            }}
            error={errors.author.error}
            helperText={errors.author.helperText}
            onChange={(e) => {
              setFormData({
                ...formData,
                author: e.target.value
              })
            }}
          />

          <TextField
            className={scss['text-field']}
            id="outlined-multiline-static"
            label="描述"
            multiline
            rows={4}
            value={formData.describe}
            InputProps={{
              inputProps: {
                maxLength: 200,
              },
            }}
            error={errors.describe.error}
            helperText={errors.describe.helperText}
            onChange={(e) => {
              setFormData({
                ...formData,
                describe: e.target.value
              })
            }}
          />

          <div>上传封面</div>

          <div>

            <input className={scss.upload} type="file" onChange={handleFileChange} />

            { fileSrc && <img className={scss.preview} src={fileSrc || ''} alt="cover" />}

          </div>

          <Button className={scss.save} variant="contained" onClick={create}>save</Button>


        </div>
      </SwipeableDrawer>
    </ThemeProvider>
  )
})

export const MangaEditor = memo(Index)
 