import { ReactElement, ReactNode } from 'react'

interface ListItemProps {
  index: number
  name: string
  thumbnail: ReactNode
}

const ListItem = ( props:ListItemProps ): ReactElement => {
  const { index, thumbnail, name } = props
  return (
    <div>
      { index > 0 && (
        <div className="h-px mx-5 bg-[rgb(207,207,207)] dark:bg-[rgb(73,73,73)]" />
      ) }
      <div className="flex items-center gap-3 px-5 py-3 cursor-default">
        <div
          className="w-8 h-8 border border-system-border dark:border-system-border-dark shadow-sm"
          style={ { borderRadius:'0.4rem', overflow:'hidden' } }>
          { thumbnail }
        </div>
        <span className="text-sm font-medium text-system-text dark:text-system-text-dark">
          { name }
        </span>
      </div>
    </div>
  )
}

export default ListItem
