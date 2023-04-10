interface ItemProps {
    text: string
}

export default function Item(props: ItemProps) {
    const { text } = props

    return <div>{text}</div>
}