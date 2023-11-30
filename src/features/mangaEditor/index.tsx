import { ChangeEvent, forwardRef, useImperativeHandle, useState } from "react"
import { SwipeableDrawer } from "@mui/material"
import {TextField, Button} from "@mui/material"


import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as api from "../../services";

import scss from './index.module.scss'
import { IManga } from "../../services/model";

type EditorProps = {
  onClose?: () => void,
  onOpen?: () => void,
  onSaved?: () => void
}

export interface EditorRef {
  open(): void
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export const  MangaEditor = forwardRef((props: EditorProps, ref) => {

  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileSrc, setFileSrc] = useState<string | null>(null);

  const [formData, setFormData] = useState<IManga>({
    name: '',
    enname: '',
    author: '',
    describe: '',
    cover: ''
  })

  const [errors, setErrors] = useState<{[key: string]: {error: boolean, helperText: string}}>({
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

  const handleUpload = () => {

    console.log('----> 上传')
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
    const result: {[key: string]: {error: boolean, helperText: string}} = {}
    Object.keys(formData).forEach((key: string) => {
      if (!formData[key]) {
        result[key] = {
          error: true,
          helperText: '不能为空'
        }
      } else {
        result[key] = {
          error: false,
          helperText: ''
        }
      }
    })

    setErrors(result)
  }

  const create = async() => {
    if (!selectedFile) {
      return
    }

    validateForm()

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

          <div >

            <input className={scss.upload} type="file" onChange={handleFileChange} />

            { fileSrc && <img className={scss.preview} src={fileSrc || ''} alt="cover" />}

            {/* <div onClick={handleUpload}>上传</div> */}
          </div>

          <Button className={scss.save} variant="contained" onClick={create}>save</Button>


        </div>
      </SwipeableDrawer>
    </ThemeProvider>
  )
})