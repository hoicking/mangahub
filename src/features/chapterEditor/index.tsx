
import { memo, useState, forwardRef, useImperativeHandle, ChangeEvent } from "react"

import { ThemeProvider } from '@mui/material/styles'
import { SwipeableDrawer, TextField, Button } from "@mui/material"

import { createChapter, uploadChapter } from "../../services"
import { darkTheme } from "../../util/mui"

import { IChapter } from "../../services/model"
import scss from './index.module.scss'

export interface EditorRef {
  open(): void
}

type Error = {
  [key in 'name' | 'no'] : {
    error: boolean
    helperText: string
  }
}

interface Props {
  enName?: string
  successCallback: () => void
}

const Index = memo(forwardRef(({enName, successCallback}: Props, ref) => {

  const [open, setOpen] = useState(false)

  const [formData, setFormData] = useState<IChapter>({} as IChapter)

  const [errors, setErrors]  = useState<Error>({} as Error)

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true)
    }
  }))

  const changeForm = (key: keyof IChapter, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [key]: e?.target?.value
    })
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const validator = () => {
    let res = true
    const result: Error = {...errors};

    ['name', 'no'].forEach((item) => {

      if (!formData[item as keyof Error]) {
        result[item as keyof Error] = {
          error: true,
          helperText: '不能为空'
        }
        res = false
      } else {
        result[item as keyof Error] = {
          error: false,
          helperText: ''
        }
      }
    })
    setErrors(result)
    return res
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files

    if (files && files.length > 0) {
      setSelectedFiles(files)
    }
  }

  const create = async() => {
    if (!selectedFiles || selectedFiles.length === 0) {
      console.log('请上传')
      return
    }

    if (!validator()) return

    const obj = {...formData}

    obj.mangaenname = enName || ''

    try {
      const pages: string[] = await uploadChapter( obj.mangaenname,obj.no, selectedFiles)
      console.log(pages)
      obj.cover = pages?.[0]
      obj.totalpage = pages.length
      await createChapter(obj)
      setOpen(false)
      successCallback()
    } catch (error) {
      console.log(error)
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
            label="章节名"
            value={formData.name}
            InputProps={{
              inputProps: {
                maxLength: 20,
              },
            }}
            error={errors?.name?.error}
            helperText={errors?.name?.helperText}
            onChange={(e) => changeForm('name', e)}
          />

          <TextField
            className={scss['text-field']}
            id="outlined-controlled"
            label="no"
            InputProps={{inputProps: {maxLength: 20}}}
            value={formData.no}
            error={errors?.no?.error}
            helperText={errors?.no?.helperText}
            onChange={(e) => changeForm('no', e)}
          />

          <div>上传</div>

          <div >
            {/* <input className={scss.upload} type="file" mozdirectory onChange={handleFileChange} /> */}
            {/* @ts-ignore */}
            <input  directory="" webkitdirectory=""  type="file" onChange={handleFileChange} /> 

          </div>

          <Button className={scss.save} variant="contained" onClick={create}>save</Button>

        </div>

      </SwipeableDrawer>

    </ThemeProvider>
  )
}))

export {Index as ChapterEditor}