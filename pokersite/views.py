from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
from . import templates
import os
from django import forms
from django.http import JsonResponse, HttpResponseRedirect
# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
from django.urls import reverse
from django.db import IntegrityError
from .models import User, Session
from django.contrib.auth import authenticate, login, logout

def index(request):
    return render(request, "index.html", {
        "user": request.user,        
		"signedIn": request.user.is_authenticated
    })


def stats(request,username):
    if request.method == "POST":
        net = request.POST["net"]
        time = request.POST["time"]
        date = request.POST["date"]
        print(date)
        notes = request.POST["notes"]
        try:
            session = Session(
                    user=request.user,
                    gain=net,
                    hours=time,
                    date=date,
                    notes=notes
                )            
            session.save()
            reStat(request.user)
        except IntegrityError:
            return render(request, "pokersite/stats.html", {
                "message": "Failed to add session"
            })
        
    return render(request, "stats.html", {
        "targetUser": username,
        "loggedUser": request.user,
    })

def signin(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "signin.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "signin.html")

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "pokersite/register.html", {
                "message": "Passwords must match."
            })
        try:
            user = User.objects.create_user(username, "www@gmail.com", password)
            user.save()
            login(request, user)
        except IntegrityError:
            return render(request, "pokersite/register.html", {
                "message": "Username already taken."
            })

        return HttpResponseRedirect(reverse("index"))


    return render(request, "register.html")

def signout(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))



def sessions(request,username):
    return JsonResponse([session.serialize() for session in Session.objects.filter(user=User.objects.get(username=username))], safe=False)

@csrf_exempt 
def delSession(request):
    data = json.loads(request.body)
    itemid = data.get("id", "")
    Session.objects.get(id = itemid).delete()
    reStat(request.user)
    return JsonResponse({"message": "Session deleted"}, status=404)

def users(request):    
    return JsonResponse([user.serialize() for user in User.objects.all()], safe=False)

def reStat(username):
    profit = 0
    hours = 0
    sessions = 0 

    for session in Session.objects.filter(user=User.objects.get(username=username)):
        profit += session.gain
        hours += session.hours
        sessions += 1
    user = User.objects.get(username=username)
    user.profit = profit
    user.hours = hours
    user.sessions = sessions
    user.save()
    return profit

def variance(request):
    return render(request, "variance.html")


def blackjack(request):
    return render(request, "blackjack.html")
