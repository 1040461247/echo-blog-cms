import React, { memo, useEffect } from 'react'
import Vditor from 'vditor'
import 'vditor/src/assets/less/index.less'

const MdEditor: React.FC<{
  className?: string
  setVditor: (v: Vditor) => void
}> = ({ className, setVditor }) => {
  useEffect(() => {
    const vditor = new Vditor('vditor', {
      after: () => {
        setVditor(vditor)
      },
      height: 'calc(100vh - 56px - 65px)',
      placeholder: 'Waiting for input...',
      counter: {
        enable: true,
      },
      preview: {
        hljs: {
          lineNumber: true,
        },
      },
      outline: {
        enable: true,
        position: 'right',
      },
    })

    return () => {
      vditor.destroy()
      vditor.clearCache()
    }
  }, [])

  return <div className={`vditor ${className}`} id="vditor" />
}

export default memo(MdEditor)
