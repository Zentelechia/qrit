import React, { Component } from 'react'
import { Radio, Checkbox, Input, Button, Row, Col, Menu, Dropdown, Icon } from 'antd'
import 'antd/dist/antd.css'

import { Meteor } from "meteor/meteor";

class FormBuilder extends Component {
  state = {
    content: [],
    // content: [{
    //   type: 'single',
    //   title: 'Что расскажете?'
    // }, {
    //   type: 'radio',
    //   title: 'Ты кто?',
    //   answers: [ 'Я клевый', 'Я дурак' ]
    // }, {
    //   type: 'checkbox',
    //   title: 'Что ты хочешь?',
    //   answers: [ 'Пиццу', 'Колу', 'Пепси' ]
    // }, {
    //   type: 'multi',
    //   title: 'Введите рассказ о себе'
    // }, {
    //   type: 'buttons',
    //   title: 'Хотите домой?',
    //   answers: [ 'Да', 'Хочу', 'Не очень', 'Подумаю' ]
    // }],
    types: [
      { name: 'single', label: 'Поле ввода' },
      { name: 'multi', label: 'Большое поле ввода' },
      { name: 'radio', label: 'Выбор из вариантов' },
      { name: 'checkbox', label: 'Множественный выбор из вариантов' },
      { name: 'buttons', label: 'Набор кнопок' }
    ],
    user_id: 1,
    title: '',
    tags: [],
    anonymously: true
  }

  handlerItem = (event, index, innerIndex, action) => {
    const { value } = event.target

    this.setState(({ content }) => {
      if (content[index].answers && action === 'answers') {
        content[index].answers[innerIndex] = { title: value, index: new Date().getTime() }
      } else {
        content[index].title = value
      }

      return { content }
    })
  }

  addItem = ({ key, type }) => {
    if (type === 'radio' || type === 'checkbox' || type === 'buttons') {
      this.setState(({ content }) => {
        content[key].answers.push({
          title: `Новый варинт #${content[key].answers.length + 1}`,
          index: new Date().getTime()
        })

        return { content }
      })
    } else {
      const { types } = this.state
      const { name } = types[key]

      this.setState(({ content }) => {
        return {
          content: [
            ...content,
            {
              type: name,
              title: 'Название поля',
              index: new Date().getTime(),
              answers: []
            }
          ]
        }
      })
    }
  }

  async createForm () {
    console.log(this.state)
    forms.insert({
          ...this.state,
          form_id: new Date().getTime()
      })
      this.state=[]
        console.log(forms.findOne())

  }

  handlerInput = (event) => {
    const { name, checked, value } = event.target
    const inital = this.state[name]

    if (typeof value === 'boolean') {
      this.setState({
        [name]: checked
      })
    } else if (value.split(', ').length === 1 && typeof inital !== 'object') {
      this.setState({
        [name]: value
      })
    } else {
      this.setState({
        [name]: value.split(', ')
      })
    }
  }

  render () {
    const { content, types, title, tags, anonymously } = this.state

    const menu = (
      <Menu onClick={(key) => this.addItem(key)}>
        {
          types.map(({ name, label }, i) => {
            return <Menu.Item key={i}>{label}</Menu.Item>
          })
        }
      </Menu>
    )

    return (
      <div style={{
        maxWidth: '280px',
        margin: '30px auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <Input
          style={{ margin: '5px 0' }}
          name='title'
          value={title}
          placeholder='Название опроса...'
          onChange={this.handlerInput}
        />

        <Input
          style={{ margin: '5px 0' }}
          name='tags'
          value={tags.join(', ')}
          onChange={this.handlerInput}
          placeholder='Тэги...'
        />

        <Checkbox
          style={{ margin: '5px 0' }}
          name='anonymously'
          value={anonymously}
          defaultChecked
          onChange={this.handlerInput}
        >
          Анонимный опроc
        </Checkbox>

        {
          content.map(({ type, title, answers }, i) => {
            if (type === 'single') {
              return (
                <div key={i}>
                  <Input
                    style={{
                      margin: '5px 0',
                      border: 0,
                      padding: 0,
                      boxShadow: 'none',
                      color: 'rgba(0, 0, 0, 0.85)',
                      fontWeight: 500,
                      fontSize: 18
                    }}
                    value={title}
                    onChange={(e) => this.handlerItem(e, i)}
                    key={i}
                  />
                  <Input
                    style={{ margin: '5px 0' }}
                    key={i + 1}
                  />
                </div>
              )
            } else if (type === 'multi') {
              return (
                <div key={i}>
                  <Input
                    style={{
                      margin: '5px 0',
                      border: 0,
                      padding: 0,
                      boxShadow: 'none',
                      color: 'rgba(0, 0, 0, 0.85)',
                      fontWeight: 500,
                      fontSize: 18
                    }}
                    key={i}
                    value={title}
                    onChange={(e) => this.handlerItem(e, i)}
                  />
                  <Input.TextArea
                    style={{ minHeight: '40px', margin: '5px 0', resize: 'none' }}
                    autosize
                    key={i + 1}
                  />
                </div>
              )
            } else if (type === 'radio') {
              return (
                <div key={i}>
                  <Input
                    style={{
                      margin: '5px 0',
                      border: 0,
                      padding: 0,
                      boxShadow: 'none',
                      color: 'rgba(0, 0, 0, 0.85)',
                      fontWeight: 500,
                      fontSize: 18
                    }}
                    key={i}
                    value={title}
                    onChange={(e) => this.handlerItem(e, i)}
                  />
                  <Radio.Group style={{ margin: '5px 0' }}>
                    {
                      answers.map(({ title }, index) => {
                        return (
                          <Radio
                            style={{ display: 'block', margin: '5px 0' }}
                            value={title}
                            key={index}
                          >
                            <Input
                              style={{
                                margin: '-5px 0',
                                border: 0,
                                padding: 0,
                                boxShadow: 'none',
                                fontSize: 12
                              }}
                              value={title}
                              onChange={(e) => this.handlerItem(e, i, index, 'answers')}
                            />
                          </Radio>
                        )
                      })
                    }
                  </Radio.Group>
                  <a
                    style={{ display: 'block' }}
                    onClick={() => this.addItem({ key: i, type: 'radio' })}
                  >
                    добавить ещё
                  </a>
                </div>
              )
            } else if (type === 'checkbox') {
              return (
                <div key={i}>
                  <Input
                    style={{
                      margin: '5px 0',
                      border: 0,
                      padding: 0,
                      boxShadow: 'none',
                      color: 'rgba(0, 0, 0, 0.85)',
                      fontWeight: 500,
                      fontSize: 18
                    }}
                    key={i}
                    value={title}
                    onChange={(e) => this.handlerItem(e, i)}
                  />
                  <Checkbox.Group style={{ margin: '5px 0' }}>
                    <Row>
                      {
                        answers.map(({ title }, index) => {
                          return (
                            <Col span={24} key={index} style={{ margin: '2px 0' }}>
                              <Checkbox value={title}>
                                <Input
                                  style={{
                                    margin: '-5px 0',
                                    border: 0,
                                    padding: 0,
                                    boxShadow: 'none',
                                    fontSize: 12
                                  }}
                                  value={title}
                                  onChange={(e) => this.handlerItem(e, i, index, 'answers')}
                                />
                              </Checkbox>
                            </Col>
                          )
                        })
                      }
                    </Row>
                  </Checkbox.Group>
                  <a
                    style={{ marginTop: '5px', display: 'block' }}
                    onClick={() => this.addItem({ key: i, type: 'checkbox' })}
                  >
                    добавить ещё
                  </a>
                </div>
              )
            } else if (type === 'buttons') {
              return (
                <div key={i}>
                  <Input
                    style={{
                      margin: '5px 0',
                      border: 0,
                      padding: 0,
                      boxShadow: 'none',
                      color: 'rgba(0, 0, 0, 0.85)',
                      fontWeight: 500,
                      fontSize: 18
                    }}
                    key={i}
                    value={title}
                    onChange={(e) => this.handlerItem(e, i)}
                  />
                  <Button.Group style={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    {
                      answers.map(({ title }, index) => {
                        return (
                          <Button key={index} style={{ maxWidth: '70px' }}>
                            <Input
                              style={{
                                margin: '-5px 0',
                                border: 0,
                                padding: 0,
                                boxShadow: 'none',
                                background: 'transparent',
                                fontSize: 12
                              }}
                              value={title}
                              onChange={(e) => this.handlerItem(e, i, index, 'answers')}
                            />
                          </Button>
                        )
                      })
                    }
                  </Button.Group>
                  <a
                    style={{ marginTop: '5px', display: 'block' }}
                    onClick={() => this.addItem({ key: i, type: 'buttons' })}
                  >
                    добавить ещё
                  </a>
                </div>
              )
            }

            return null
          })
        }
        <Dropdown overlay={menu}>
          <a style={{ margin: '15px 0', textAlign: 'center' }}>
            Добавить элемент <Icon type='down' />
          </a>
        </Dropdown>
        <Button type='primary' onClick={() => this.createForm()}>
          Создать
        </Button>
      </div>
    )
  }
}

export default FormBuilder
