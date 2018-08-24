import React from 'react'
import Placeholder from "./Placeholder";
import {Popup} from "semantic-ui-react";

class CardTitle extends React.Component {
    render() {
        const {value} = this.props
        let lines = value ? value.split('\n') : []
        if (lines.length > 2) {
            const trigger = <div className="g-card-title">
                {
                    lines.map(
                        (line, k) =>
                            k < 2
                                ? <Placeholder key={k}>
                                    {line}<br/>
                                </Placeholder>
                                : null
                    )
                } ...
            </div>

            return <Popup trigger={trigger}
                          content={
                              lines.map(
                                  (line, k) => <Placeholder key={k}>
                                      {line}<br/>
                                  </Placeholder>
                              )
                          }
                          on='click'
                          size='mini'
                          wide='very'
            />
        }
        else {
            return <div className="g-card-title">
                {
                    value
                        ? lines.map(
                        (line, k) =>
                            k < 3
                                ? <Placeholder key={k}>
                                    {line}<br/>
                                </Placeholder>
                                : null
                        )
                        : <span className="text-muted">{'<Empty>'}</span>
                }
            </div>
        }


    }
}

export default CardTitle