import React, { useEffect } from 'react'
import Vditor from 'vditor'
import 'vditor/src/assets/less/index.less'

const MdEditor: React.FC<{ className?: string }> = ({ className }) => {
  useEffect(() => {
    const vditor = new Vditor('vditor', {
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
    }
  }, [])

  return <div className={`vditor ${className}`} id="vditor" />
}

export default MdEditor
