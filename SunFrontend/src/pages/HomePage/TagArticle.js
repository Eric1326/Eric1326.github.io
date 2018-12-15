import React, { Component } from 'react';
import { connect } from 'dva';
import { List } from 'antd';
import moment from 'moment';
import Link from 'umi/link';
import styles from './ArticleList.less';

@connect(({ articles, loading }) => ({
  tagArticle: articles.tagArticle,
  loading: loading.models.articles
}))
class Tags extends Component {

  componentDidMount() {
    const { dispatch, match } = this.props
    const { params: { tags } } = match;
    dispatch({
      type: 'articles/fetchTagArticle',
      payload: {
        tags
      },
    })
  }

  render() {
    const { tagArticle=[], match } = this.props;
    const { params: { tags } } = match;
    return (
      <div className={styles.body}>
        <h1 className={styles.heard}>标签<span className={styles.tagsColor}> {tags} </span>下的文章</h1>
        <div>
          <List
            itemLayout="horizontal"
            
            // pagination={{
            //     // onChange: (page) => {
            //     //   console.log(page);
            //     // },
            //     pageSize: 10,
            // }}
            dataSource={tagArticle.list}
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
      </div>
    )
  }
}

export default Tags;

// import React, { Component } from 'react';
// import { connect } from 'dva';
// import { List } from 'antd';
// import moment from 'moment';
// import Link from 'umi/link';
// import styles from './ArticleList.less';

// @connect(({ articles, loading }) => ({
//   tagArticle: articles.tagArticle,
//   loading: loading.models.articles
// }))
// class Tags extends Component {

//   componentDidMount() {
//     const { dispatch, match } = this.props
//     const { params: { tagId } } = match;
//     dispatch({
//       type: 'articles/fetchTagArticle',
//       payload: {
//         tagId
//       },
//     });
//   }

//   render() {
//     const { tagArticle=[] } = this.props;
//     console.log(tagArticle)
//     return (
//       <div>
//         <List
//           itemLayout="horizontal"
          
//           // pagination={{
//           //   // onChange: (page) => {
//           //   //   console.log(page);
//           //   // },
//           //   pageSize: 10,
//           // }}
//           dataSource={tagArticle.list}
//           renderItem={item => (
//             <List.Item 
//               key={item.id}
//               className={styles.listItem}
//             >
//               <List.Item.Meta
//                 title={
//                   <Link to={`/article/${item.id}`}>
//                     <h1 className={styles.title}>{item.title}</h1>
//                   </Link>
//                 }
//                 description={
//                   <div>
//                     <span className={styles.excerpt}>
//                       {item.excerpt}
//                     </span>
//                     <span className={styles.getDetail}>
//                       <Link to={`/article/${item.id}`}>阅读更多</Link>
//                     </span>
//                   </div>
//                 }
//               />
//               <span className={styles.createTime}>
//                 {moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
//               </span> 
//             </List.Item>
//           )}
//         />
//       </div>
//     )
//   }
// }

// export default Tags;
