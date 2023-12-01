from django import template

register = template.Library()

@register.filter
def model_type(value):
    return value.__class__.__name__