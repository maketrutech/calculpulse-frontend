import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: false }
  }

  static getDerivedStateFromError() {
    return { error: true }
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="copy">
        <h1>Un pépin est survenu</h1>
        <p>Rechargez la page. Si ça continue, écrivez-nous depuis la page contact.</p>
        <p><a href="/">Retour à l’accueil</a></p>
      </div>
    )
  }
}
