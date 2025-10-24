import type { QueryKey } from '@tanstack/query-core'
import { useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import { toast } from 'sonner'

export const useUndoableDelete = () => {
  const queryClient = useQueryClient()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  const deleteWithUndo = ({
    queryKey,
    idToDelete,
    actualDelete,
    message,
    errorMessage,
  }: {
    queryKey: QueryKey
    idToDelete: number
    actualDelete: () => Promise<void>
    message: string
    errorMessage: string
  }) => {
    const entityName = Array.isArray(queryKey) ? queryKey[0] : queryKey

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    queryClient.setQueryData(queryKey, (old: any) => {
      if (!old) {
        return old
      }

      if (Array.isArray(old)) {
        // Normal array: [...]
        return old.filter((item: any) => item.id !== idToDelete)
      }

      if (old[entityName] && Array.isArray(old[entityName])) {
        return {
          ...old,
          [entityName]: old[entityName].filter(
            (item) => item.id !== idToDelete
          ),
        }
      }

      // Warn for another structure types
      console.warn('Unknown cache structure, skipping optimistic update:', old)
      return old
    })

    toast.success(message, {
      action: {
        label: 'Cancel',
        onClick: () => {
          clearTimeout(timeoutRef.current)

          queryClient.invalidateQueries({ queryKey })
        },
      },
    })

    timeoutRef.current = setTimeout(async () => {
      timeoutRef.current = undefined

      try {
        await actualDelete()
        // Reloading data from source after deletion
        await queryClient.refetchQueries({ queryKey })
      } catch {
        // Invalidate and reload on error
        queryClient.invalidateQueries({ queryKey })

        toast.error(errorMessage)
      }
    }, 4000) // 4s is a default animation duration on toasts
  }

  return { deleteWithUndo }
}
