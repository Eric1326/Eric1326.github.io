import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import Link from 'umi/link';
import styles from './Tags.less';

@connect(({ articles, loading }) => ({
  tags: articles.tags,
  loading: loading.models.articles
}))
class Tags extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'articles/fetchTags'
    })
  }

  render() {
    const { tags=[] } = this.props;
    return (
      <div className={styles.body}>
        <h1>标签</h1>
        <div>
          {
            tags.map((item) => (
              <div className={styles.tag} key={item.id}>
                <Link to={`/tagArticle/${item.name}`}>
                  <Button 
                    type="primary" 
                    ghost
                    className={styles.button}
                  >
                    {item.name}(10)
                  </Button>
                </Link>
                
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Tags;
// // style={{ padding: '26px 16px 16px' }}
