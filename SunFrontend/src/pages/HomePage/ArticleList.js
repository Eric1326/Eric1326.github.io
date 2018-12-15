import React, { Component } from 'react';
import { connect } from 'dva';
import { List } from 'antd';
import moment from 'moment';
import Link from 'umi/link';
import styles from './ArticleList.less';

@connect(({ articles, loading }) => ({
  articles: articles.articlelist,
  loading: loading.models.articles
}))
class ArticleList extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'articles/fetch'
    })
  }

  render() {
    const { articles=[] } = this.props;
    return (
      <div>
        {/* <div>{articles.title}</div> */}
        <List
          itemLayout="horizontal"
          
          pagination={{
            // onChange: (page) => {
            //   console.log(page);
            // },
            pageSize: 10,
          }}
          dataSource={articles.list}
          renderItem={item => (
            <List.Item 
              key={item.id}
              className={styles.listItem}
            >
              <List.Item.Meta
                title={
                  <Link to={`/article/${item.id}`}>
                    <h1 className={styles.title}>{item.title}</h1>
                  </Link>
                }
                description={
                  <div>
                    <span className={styles.excerpt}>
                      {item.excerpt}
                    </span>
                    <span className={styles.getDetail}>
                      <Link to={`/article/${item.id}`}>阅读更多</Link>
                    </span>
                  </div>
                }
              />
              <span className={styles.createTime}>
                {moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
              </span> 
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default ArticleList;
