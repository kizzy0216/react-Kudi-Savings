import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from '../loading/loading.module.scss'
import { KudiLogo } from 'assets/svg'
export class ErrorBoundary extends Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    componentDidCatch(error, info) {
        console.error('Error boundary caught an error', error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.layout}>
                    <div className={styles.sidebar}>
                        <KudiLogo />
                    </div>
                    <div className={styles.main}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '10px',
                                height: '90vh'
                            }}
                        >
                            <div
                                style={{
                                    textAlign: 'center'
                                }}
                            >
                                <h3>
                                    Something went wrong. Can't render this
                                    part.
                                </h3>
                                <Link to="/"> Go Home </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
