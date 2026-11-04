export default function BlurText({ as: Tag = 'span', text, className = '', ...rest }) {
  return <Tag className={className} {...rest}>{text}</Tag>;
}
