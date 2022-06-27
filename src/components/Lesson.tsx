import { useEffect } from 'react'
import { CheckCircle, Lock } from 'phosphor-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import cx from 'classnames'

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'class'
}

export const Lesson = (props: LessonProps) => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const isAvailableLesson = isPast(props.availableAt)
  const availableDateFormatted = format(
    props.availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    {
      locale: ptBR,
    }
  )

  const isActiveLesson = slug === props.slug

  useEffect(() => {
    if (!isAvailableLesson && isActiveLesson) {
      navigate('/event')
    }
  }, [isActiveLesson])

  return (
    <Link
      className={cx('group', { 'disabled-link': !isAvailableLesson })}
      to={`/event/lesson/${props.slug}`}
    >
      <span className="text-greay-300">{availableDateFormatted}</span>

      <div
        className={cx(
          'rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors',
          { 'bg-green-500': isActiveLesson }
        )}
      >
        <header className="flex items-center justify-between">
          {isAvailableLesson ? (
            <span
              className={cx('text-sm  font-medium flex items-center gap-2', {
                'text-white': isActiveLesson,
                'text-blue-500': !isActiveLesson,
              })}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span
            className={cx(
              'text-xs rounded px-2 py-[0.125rem] text-white border font-bold',
              {
                'border-white': isActiveLesson,
                'border-green-300': !isActiveLesson,
              }
            )}
          >
            {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong
          className={cx(' mt-5 block', {
            'text-white': isActiveLesson,
            'text-gray-200': !isActiveLesson,
          })}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  )
}
