ShowAsScroll
===================

Get more data from a subscription as more the user scrolls.

## Usage

In client
```css
/* To be able to scroll, ensure these styles to your threshold */
  .overflow-scroll {
    overflow-y: scroll;
  }
```

```js
Template.Foo.onCreated(function(){
  this.showAsScroll = new ShowAsScroll({
    threshold: '.overflow-scroll',
    increment: 12,
    limit: 9,
    template: this,
    // You can make use of any reactive data source in here
    query({ limit }){
      return Meteor.users.find({}, {limit})
    },
  })
})

Template.Foo.onRendered(function(){
  // important to be called here when the threshold element is available
  this.showAsScroll.run()
})

Template.Foo.helpers({
  usersList: () => Template.instance().showAsScroll.getData(),
  listHasEnded: () => Template.instance().ShowAsScroll.hasEnded.get(),
})
```
