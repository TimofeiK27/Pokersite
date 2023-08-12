from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("signin", views.signin, name="signin"),
    path("register", views.register, name="register"),
    path("signout", views.signout, name="signout"),
    path("variance", views.variance, name="variance"),

    path("blackjack", views.blackjack, name="blackjack"),
    path("poker", views.poker, name="poker"),

    path("sessions/<str:username>", views.sessions, name="sessions"),
    path("users", views.users, name="users"),
    path("delSession", views.delSession, name="delSession"),
    path("<str:username>", views.stats, name="stats"),

]