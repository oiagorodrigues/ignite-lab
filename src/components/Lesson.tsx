import { CheckCircle, Lock } from 'phosphor-react'
import { Link } from 'react-router-dom'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'class'
}

export const Lesson = (props: LessonProps) => {
  const isAvailableLesson = isPast(props.availableAt)
  const availableDateFormatted = format(
    props.availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    {
      locale: ptBR,
    }
  )

  return (
    <Link className="group" to={`/event/lesson/${props.slug}`}>
      <span className="text-greay-300">{availableDateFormatted}</span>

      <div className="rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors">
        <header className="flex items-center justify-between">
          {isAvailableLesson ? (
            <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}

          {props.type === 'live' ? (
            <span className="text-xs rounded px-2 py-[0.125rem] text-green-300 border border-green-300 font-bold">
              AO VIVO
            </span>
          ) : (
            <span className="text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold">
              AULA PRÁTICA
            </span>
          )}
        </header>

        <strong className="text-gray-200 mt-5 block">{props.title}</strong>
      </div>
    </Link>
  )
}
